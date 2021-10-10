using System;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using DatasetApi.BAL;
using DatasetApi.BAL.Templates;
using DatasetApi.DAL;
using DatasetApi.DAL.Integrations;
using DatasetApi.ModelView;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DatasetApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DatasetController: ControllerBase
    {
        private const string url = "http://192.168.1.167:8080/api/graphql";

        private readonly HttpClient _httpClient;

        public DatasetController()
        {
            _httpClient = new HttpClient();
        }

        [HttpGet]
        public async Task<IActionResult> GetDatasetsAsync(CancellationToken cancellationToken = default)
        {
            var template = new GetDatasetsTemplate().Get();

            var data = await SendRequest<DatasetsModel>(template, cancellationToken);

            var response = data?.Data?.Browse?.Entities?.Select(x => new EntityView
            {
                Type = x.Type,
                Urn = x.Urn,
                Name = x.Urn.Replace(InternalConstants.Prod, string.Empty, StringComparison.InvariantCulture)
                .Replace(InternalConstants.Urn, string.Empty, StringComparison.InvariantCulture)
            });

            if (response == default)
            {
                return BadRequest();
            }

            return Ok(response);
        }

        [HttpGet("{urn}")]
        public async Task<IActionResult> GetAttributesAsync(string urn, CancellationToken cancellationToken = default)
        {
            var template = new GetFieldsTemplate().Get(urn);

            var data = await SendRequest<DatasetFieldsModel>(template, cancellationToken);

            var response = data.Data?.Dataset?.SchemaMetadata?.Fields?.Select(x => new FieldView
            {
                Field = x.FieldPath,
                Type = x.Type,
                Description = x.Description
            });

            if(response == default)
            {
                return BadRequest();
            }

            return Ok(response);
        }

        private async Task<T> SendRequest<T>(string template, CancellationToken cancellationToken)
        {
            var content = new System.Net.Http.StringContent(template);
            var result = await _httpClient.PostAsync(url, content, cancellationToken);

            var responseString = await result.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<T>(responseString);
        }
    }
}
