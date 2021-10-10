using System;
namespace DatasetApi.BAL.Templates
{
    public class GetDatasetsTemplate : IGetTemplate
    {
        private readonly static string Template = "{\"query\":\"query getBrowseResults($input: BrowseInput!) {\\n  browse(input: $input) {\\n    entities{\\n      urn\\n      type\\n    }\\n    groups {\\n      name\\n      __typename\\n      count\\n    }\\n  }\\n}\",\"variables\":{\"input\":{\"type\":\"DATASET\",\"path\":[\"prod\",\"bigquery\",\"bigquery-public-data\",\"covid19_geotab_mobility_impact\"],\"count\":10}},\"operationName\":\"getBrowseResults\"}";
        public string Get()
        {
            return Template;
        }

        public string Get(string urn)
        {
            throw new NotImplementedException();
        }
    }
}
