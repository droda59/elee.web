using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace E133.Business
{
    internal class HtmlLoader : IHtmlLoader
    {
        public async Task<string> ReadHtmlAsync(Uri uri)
        {
            var client = new HttpClient();

            var data = await client.GetAsync(uri.AbsoluteUri);

            var content = await data.Content.ReadAsStringAsync();

            return content;
        }
    }
}