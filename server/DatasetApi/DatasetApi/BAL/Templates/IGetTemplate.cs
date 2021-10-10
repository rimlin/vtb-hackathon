using System;
namespace DatasetApi.BAL.Templates
{
    public interface IGetTemplate
    {
        public string Get();

        public string Get(string urn);
    }
}
