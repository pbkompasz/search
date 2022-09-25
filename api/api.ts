type Filetype = "pdf" | "docx" | "txt" | "ppt"

type QueryOptions = {
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

interface BaseQuery {
  toString(): string
  options: string[]
}

interface Query extends BaseQuery {

}

// Each 
enum ConditionalParameters {
  Or,
  And,
  Exclusion,
  Wildcard,
}
/*

*/

function queryToString() {
  let resp = ''
  this.queryOptions.forEach(opt => {
    resp += opt
  }) 
  return resp;
}

function createQuery(
  searchTerm: SearchTerm,
  QueryOptions: QueryOptions = {},
  otherOptions: Options = {},
): BaseQuery {
  let baseQuery = {
    toString: queryToString,
    options: [''],
  };
  searchTerm.forEach(obj => {
    switch (obj.condition) {
      case ConditionalParameters.Exclusion:
        baseQuery.options.push(`~${obj.term} `);
        break;
      default:
        break;
    }
  });
  return baseQuery;  
}

function parseQueryString(query: string): QueryOptions {
  throw new Error('Not implemented');
}

function expandQuery(query: BaseQuery | Query): Query {
  throw new Error('Not implemented');
}

const resp = createQuery([{
  term: 'name',
  condition: ConditionalParameters.Exclusion,
}]);

console.log(resp);

export default createQuery;
export {
  createQuery,
  expandQuery,
  parseQueryString,
}