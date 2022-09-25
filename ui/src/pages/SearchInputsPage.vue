
<template>
  <q-page class="column">
    <div class="row justify-evenly bg-primary">
      <q-tabs v-model="tab" inline-label class="bg-white">
        <q-tab name="terms">
          <div class="tab column">
            <div>Search</div>
            <div>terms</div>
          </div>
        </q-tab>
        <q-separator vertical spaced></q-separator>
        <q-tab name="query_options">
          <div class="tab column">
            <div>Query</div>
            <div>options</div>
          </div>
        </q-tab>
        <q-separator vertical spaced></q-separator>
        <q-tab name="other_options">
          <div class="tab column">
            <div>Other</div>
            <div>options</div>
          </div>
        </q-tab>
      </q-tabs>
      <div class="row">
        <q-select
          label="Date"
          v-model="otherOptions.dateRange"
          :options="dataRangeOptions"
        />
      </div>
    </div>
    <q-tab-panels v-model="tab" animated class="shadow-2 rounded-borders">
      <q-tab-panel class="row no-wrap" name="terms">
        <div class="q-pr-sm">
          <q-input
            v-model="terms.contains"
            filled
            type="textarea"
            label="Type terms"
          >
            <q-tooltip>
              <div class="text-caption">
                Each line contains a search term, a term will appear exactly in your search result
              </div>
            </q-tooltip>
          </q-input>
          <div>
            <q-checkbox v-model="terms.strictMode">
              <div class="text-caption">
                Every term should appear in the search results
              </div>
            </q-checkbox>
          </div>
        </div>
        <div>
          <q-input
            v-model="terms.excludes"
            filled
            type="textarea"
            label="Type exclusion terms"
          >
            <q-tooltip>
              <div class="text-caption">
                Each line contains a phrase, a phrase can contain multiple words
              </div>
            </q-tooltip>
          </q-input>
        </div>
      </q-tab-panel>

      <q-tab-panel name="query_options" class="row">
        <q-select
          v-model="queryOptions.filetype"
          :options="fileTypeOptions"
          class="col-6 option"
          outlined
        ></q-select>
        <q-input
          v-model="queryOptions.site"
          label="Site"
          class="col-6 option"
          filled
        ></q-input>
        <q-input
          v-model="queryOptions.related"
          label="Related"
          class="col-6 option"
          filled
        ></q-input>
        <q-input
          v-model="queryOptions.intitle"
          label="In title"
          class="col-6 option"
          filled
        ></q-input>
        <!-- If single word sue inurl -->
        <q-input
          v-model="queryOptions.inurl"
          label="In url"
          class="col-6 option"
          filled
        ></q-input>
        <q-input
          v-model="queryOptions.intext"
          label="In text"
          class="col-6 option"
          filled
        ></q-input>
        <div id="around" class="col-12 row justify-evenly no-wrap">
          <q-input
            v-model="queryOptions.around.distance"
            label="Around"
            class="option"
            filled
          ></q-input>
          <q-input
            v-model="queryOptions.around.firstPhrase"
            label="Phrase #1"
            class="option"
            filled
          ></q-input>
          <q-input
            v-model="queryOptions.around.secondPhrase"
            label="Phrase #2"
            class="option"
            filled
          ></q-input>
        </div>
        <!-- If single word sue inanchor -->
        <q-input
          v-model="queryOptions.inanchor"
          label="Site"
          class="col-6 option"
          filled
        ></q-input>
      </q-tab-panel>

      <q-tab-panel name="other_options"> none </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<style lang="sass" scoped>
.tab
  font-size: small
  text-decoration: none
  max-width: 50px
  white-space: normal
.option
  padding: 5px
</style>

<script setup lang="ts">
import { ref, watch, computed, Ref } from 'vue';
import { useQuasar } from 'quasar';
import {
  createQueryString,
  createQueryOptionsString,
  QueryOptions,
} from '../api/api';

const dataRangeOptions = [
  {
    label: 'Anytime',
    value: '',
  },
  {
    label: 'In the past hour',
    value: '',
  },
  {
    label: 'In the last 24 hours',
    value: '',
  },
  {
    label: 'In the past week',
    value: '',
  },
  {
    label: 'In the past month',
    value: '',
  },
  {
    label: 'Custom range',
    value: '',
  },
];

const fileTypeOptions = [
  {
    label: 'None',
    value: false,
  },
  {
    label: 'Pdf',
    value: 'pdf',
  },
  {
    label: 'Docx',
    value: 'docx',
  },
  {
    label: 'Txt',
    value: 'txt',
  },
  {
    label: 'PowerPoint',
    value: 'ppt',
  },
];

/*
Resources
  https://ahrefs.com/blog/google-advanced-search-operators/
  https://ahrefs.com/blog/meta-robots/
  https://developer.chrome.com/docs/extensions/mv3/manifest/
  https://developer.chrome.com/docs/extensions/mv3/tut_debugging/
  https://quasar.dev/quasar-cli-vite/developing-browser-extensions/bex-communication
*/

const otherOptions = ref({
  dateRange: dataRangeOptions[0],
});
watch(
  otherOptions,
  (val) => {
    console.log(val);
  },
  {
    deep: true,
  }
);
const tab = ref('terms');

const terms = ref({
  contains: '',
  strictMode: false,
  excludes: '',
});

const $q = useQuasar();
$q.bex.on('reverse', ({ data }) => {
  console.log(data);
  queryStringReceived.value = data.queryRaw;
});
const queryStringReceived = ref('');

const queryStringTermsGenerated = ref('');
const queryStringGenerated: Ref<string> = computed(() => {
  return (
    queryStringTermsGenerated.value + ' ' + queryStringOptionsGenerated.value
  );
});
watch(
  terms,
  async (val) => {
    queryStringTermsGenerated.value = createQueryString(
      val.contains,
      val.strictMode,
      val.excludes
    );
    await $q.bex.send('update', {
      queryStringGenerated: queryStringGenerated.value,
    });
  },
  {
    deep: true,
  }
);

const queryOptions = ref({
  filetype: false,
  site: '',
  related: '',
  intitle: '',
  inurl: '',
  intext: '',
  around: {
    distance: null,
    firstPhrase: '',
    secondPhrase: '',
  },
  inanchor: '',
});
const queryStringOptionsGenerated = ref('');
watch(
  queryOptions,
  async (val) => {
    queryStringOptionsGenerated.value = createQueryOptionsString(
      val as QueryOptions
    );
    console.log(queryStringGenerated.value);
    await $q.bex.send('update', {
      queryStringGenerated: queryStringGenerated.value,
    });
  },
  {
    deep: true,
  }
);

// watch(
//   queryStringReceived,
//   (val) => {
//     queryStringGenerated.value = val;
//   },
//   {
//     immediate: true,
//   }
// );
</script>
