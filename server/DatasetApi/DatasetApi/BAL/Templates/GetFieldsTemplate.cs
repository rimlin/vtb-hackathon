using System;
namespace DatasetApi.BAL.Templates
{
    public class GetFieldsTemplate : IGetTemplate
    {
        private const string UrnReplacer = "%urn%";
        private const string Template = "{\"query\":\"query getBrowseResults($urn: String!, $version: Long!) {\\n  dataset(urn: $urn) {\\n    schemaMetadata(version: $version) {\\n      fields {\\n        fieldPath\\n        type\\n  description\\n    }\\n    }\\n  }\\n}\",\"variables\":{\"urn\":\"" + UrnReplacer + "\",\"version\":0},\"operationName\":\"getBrowseResults\"}";

        public string Get(string urn)
        {
            return Template.Replace(UrnReplacer, urn, StringComparison.InvariantCultureIgnoreCase);
        }

        public string Get()
        {
            throw new NotImplementedException();
        }
    }
}
