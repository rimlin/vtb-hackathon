using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace DatasetApi.DAL.Integrations
{
    public class DatasetsModel
    {
        [JsonProperty(PropertyName = "data")]
        public DataDatasetModel Data { get; set; }
    }

    public class DataDatasetModel
    {
        [JsonProperty(PropertyName = "browse")]
        public BrowseModel Browse { get;set;}
    }

    public class BrowseModel
    {
        [JsonProperty(PropertyName = "entities")]
        public List<EntityModel> Entities { get; set; }

        [JsonProperty(PropertyName = "groups")]
        public List<string> Groups { get; set; }
    }

    public class EntityModel
    {
        [JsonProperty(PropertyName = "urn")]
        public string Urn { get; set; }

        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }
    }
}
