using System;
using System.Threading.Tasks;

using CookItNow.Business.Models;

namespace CookItNow.Parser
{
    internal abstract class HtmlParser : IHtmlParser
    {
        private readonly IHtmlLoader _htmlLoader;

        protected HtmlParser(IHtmlLoader htmlLoader, string baseDomain)
        {
            this._htmlLoader = htmlLoader;
            this.BaseDomain = baseDomain;
        }

        public string BaseDomain { get; private set; }

        public abstract Task<QuickRecipe> ParseHtmlAsync(Uri uri);

        protected async Task<string> LoadHtmlAsync(Uri uri)
        {
            return await this._htmlLoader.ReadHtmlAsync(uri);
        }
    }
}