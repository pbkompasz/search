
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
        <div>
          Each line contains a search term, a term will appear exactly in your
          search result
          <q-input
            v-model="terms.contains"
            filled
            type="textarea"
            label="Type terms"
          />
        </div>
        <div>
          <q-checkbox
            v-model="terms.strictMode"
            label="Every term should appear in the search results"
          />
        </div>
        <div>
          Each line contains a phrase, a phrase can contain multiple words
          <q-input
            v-model="terms.excludes"
            filled
            type="textarea"
            label="Type exclusion terms"
          />
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

      <q-tab-panel name="other_options">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
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
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { createQueryString, applyQueryOptions } from '../api/api';

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

const otherOptions = ref({
  dateRange: dataRangeOptions[0],
})
watch(otherOptions, (val) => {
  console.log(val);
}, {
  deep: true,
});
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

const queryStringGenerated = ref('');
watch(
  terms,
  async (val) => {
    console.log(val);
    const queryStringGenerated = createQueryString(
      terms.value.contains,
      terms.value.strictMode,
      terms.value.excludes
    );
    console.log(queryStringGenerated);
    await $q.bex.send('update', {
      queryStringGenerated,
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
watch(queryOptions, (val) => {
  console.log(val);
  queryStringGenerated.value = applyQueryOptions(queryStringGenerated.value, val);
}, {
  deep: true,
})

watch(queryStringReceived, (val) => {
  queryStringGenerated.value = val;
}, {
  immediate: true,
})
</script>
