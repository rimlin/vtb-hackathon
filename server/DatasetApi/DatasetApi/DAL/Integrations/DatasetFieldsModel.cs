using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace DatasetApi.DAL.Integrations
{
    public class DatasetFieldsModel
    {
        [JsonProperty(PropertyName = "data")]
        public DataFieldsModel Data { get; set; }
    }

    public class DataFieldsModel
    {
        [JsonProperty(PropertyName = "dataset")]
        public DatasetModel Dataset { get; set; }
    }

    public class DatasetModel
    {
        [JsonProperty(PropertyName = "schemaMetadata")]
        public SchemaMetadaModel SchemaMetadata { get; set; }
    }

    public class SchemaMetadaModel
    {
        [JsonProperty(PropertyName = "fields")]
        public List<FieldsModel> Fields { get; set; }
    }

    public class FieldsModel
    {
        [JsonProperty(PropertyName = "fieldPath")]
        public string FieldPath { get; set; }

        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }
    }
}