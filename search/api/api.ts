type Filetype = "pdf" | "docx" | "txt" | "ppt"

type QueryOptions = {
  cache?: boolean
  filetype?: Filetype
  site?: string
  related?: string
  intitle?: string
  inurl?: string
  allinurl?: string
  intext?: string
  // Two phrases within NUMBER apart
  // Useful if a person has multiple names but we only know two or to find relatives
  // Hit or miss
  around?: number
  // Hit or miss
  inanchor?: string
  // Hit or miss
  allinanchor?: string
}

type Options = {
  startDate?: Date,
  endDate?: Date,
}

type SearchTerm = {
  term: string,
  condition: ConditionalParameters,
}[];

// Each 
enum ConditionalParameters {
  Or,
  And,
  Exclusion,
  Wildcard,
}
/*

*/

function getQuery(
  searchTerm: SearchTerm,
  QueryOptions: QueryOptions = {},
  otherOptions: Options = {},
): string | Error {
  let query = '';
  searchTerm.forEach(obj => {
    switch (obj.condition) {
      case ConditionalParameters.Exclusion:
        query += `~${obj.term} `;
        break;
      case ConditionalParameters.Exclusion:
        query += `~${obj.term} `;
        break;
      case ConditionalParameters.Exclusion:
        query += `~${obj.term} `;
        break;
      case ConditionalParameters.Exclusion:
        query += `~${obj.term} `;
        break;
      default:
        break;
    }
  });
  return query;
}

function parseQueryString(query: string): QueryOptions {
  return {

  }
}

const resp = getQuery([{
  term: 'name',
  condition: ConditionalParameters.Exclusion,
}]);

console.log(resp);

export default getQuery;
export {
  getQuery,
}