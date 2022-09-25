type FileType = 'pdf' | 'docx' | 'txt' | 'ppt' | false

type QueryOptions = {
  filetype?: FileType
  site?: string
  related?: string
  intitle?: string
  inurl?: string
  // allinurl?: string
  intext?: string
  // Two phrases within NUMBER apart
  // Useful if a person has multiple names but we only know two or to find relatives
  // Hit or miss
  around?: {
    firstPhrase: string
    secondPhrase: string
    distance: number | null
  }
  // Hit or miss
  inanchor?: string
  // Hit or miss
  // allinanchor?: string
}

// type Options = {
//   startDate?: Date,
//   endDate?: Date,
// }

// type SearchTerm = {
//   term: string,
//   condition: ConditionalParameters,
// };

// interface BaseQuery {
//   toString(): string
//   options: string[]
// }

// interface Query extends BaseQuery {

// }

// // Each 
// enum ConditionalParameters {
//   Or,
//   And,
//   Exclusion,
//   Wildcard,
// }
/*

*/

function createQueryString(
  searchTerm: string,
  strictMode: boolean,
  exclusionTerms: string,
) {
  let baseQuery = '';
  const termsSplit = searchTerm.split('\n');
  for (let i = 0; i < termsSplit.length - 1; i++) {
    baseQuery += `(${termsSplit[i]}) ${strictMode ? 'AND' : '|'} `
  }
  baseQuery += `(${termsSplit[termsSplit.length - 1]}) `

  const exclusionTermsSplit = exclusionTerms.split('\n');
  for (let i = 0; i < exclusionTermsSplit.length; i++) {
    baseQuery += `~(${exclusionTermsSplit[i]}) `
  }
  return baseQuery;
}

function parseQueryString(query: string) {
  throw new Error('Not implemented' + query);
}

function applyQueryOptions(queryRaw: string, options: QueryOptions) {
  let newQueryString = queryRaw;
  if (options.filetype) {
    newQueryString += `filetype: ${options.filetype} `
  }
  // TODO Validate site
  if (options.site) {
    newQueryString += `site: ${options.site} `
  }
  // TODO Validate site
  if (options.related) {
    newQueryString += `related: ${options.related} `
  }
  if (options.intitle) {
    newQueryString += `intitle: (${options.intitle}) `
  }
  if(options.inurl) {
    newQueryString += `inurl: (${options.inurl}) `
  }
  if (options.intext) {
    newQueryString += `intext: (${options.intext}) `
  }
  if (options.around) {
    newQueryString += `${options.around.firstPhrase} AROUND(${options.around.distance}) ${options.around.secondPhrase} `
  }
  if (options.inanchor) {
    newQueryString += `inanchor: (${options.inanchor}) `
  }
  console.log(newQueryString);
  return newQueryString
}

export default createQueryString;
export {
  createQueryString,
  applyQueryOptions,
  parseQueryString,
}