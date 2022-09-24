
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
          v-model="dateRange"
          :options="dataRangeOptions"
        />
      </div>
    </div>
    <q-tab-panels v-model="tab" animated class="shadow-2 rounded-borders">
      <q-tab-panel class="row no-wrap" name="terms">
        <div>
          Each line contains a search term, a term will appear exactly in your
          search result
          <q-input v-model="terms" filled type="textarea" label="Type terms" />
        </div>
        <div>
          <q-checkbox v-model="strictMode" label="Every term should appear in the search results" />
        </div>
        <div>
          Each line contains a phrase, a phrase can contain multiple words
          <q-input v-model="excludedTerms" filled type="textarea" label="Type exclusion terms" />
        </div>
      </q-tab-panel>

      <q-tab-panel name="query_options">
        <q-select v-model="filetype" :options="fileTypeOptions"></q-select>
        <q-input v-model="site" label="Site"></q-input>
        <q-input v-model="related" label="Related"></q-input>
        <q-input v-model="intitle" label="In title"></q-input>
        <!-- If single word sue inurl -->
        <q-input v-model="inurl" label="In url"></q-input>
        <q-input v-model="intext" label="In text"></q-input>
        <div id="around">
          <q-input v-model="around.distance" label="Around"></q-input>
          <q-input v-model="around.firstPhrase" label="Phrase #1"></q-input>
          <q-input v-model="around.secondPhrase" label="Phrase #2"></q-input>
        </div>
        <!-- If single word sue inanchor -->
        <q-input v-model="inanchor" label="Site"></q-input>

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
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';

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
]

const dateRange = ref(dataRangeOptions[0]);
watch(dateRange, (val) => {
  console.log(val);
});
const tab = ref('terms');

const terms = ref('');
const strictMode = ref(false)
const excludedTerms = ref('');

// t v-model="filetype" :options="fileTypeOptions"></q-select>
//         <q-input v-model="site" label="Site"></q-input>
//         <q-input v-model="related" label="Related"></q-input>
//         <q-input v-model="intitle" label="In title"></q-input>
//         <!-- If single word sue inurl -->
//         <q-input v-model="allinurl" label="In url"></q-input>
//         <q-input v-model="intext" label="In text"></q-input>
//         <div id="around">
//           <q-input v-model="around.distance" label="Around"></q-input>
//           <q-input v-model="around.firstPhrase" label="Phrase #1"></q-input>
//           <q-input v-model="around.secondPhrase" label="Phrase #2"></q-input>
//         </div>
//         <!-- If single word sue inanchor -->
//         <q-input v-model="allinanchor" label="Site"></q-inpu

const filetype = ref(fileTypeOptions[0]);
const site = ref('');
const related = ref('');
const intitle = ref('');
const inurl = ref('');
const intext = ref('');
const around = ref({
  distance: null,
  firstPhrase: '',
  secondPhrase: '',
});
const inanchor = ref('');
</script>
