using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using CookItNow.Api.Models;
using CookItNow.Business.Models;
using CookItNow.Parser;

namespace CookItNow.Api
{
    internal class LocalRepository : IQuickRecipeRepository
    {
        private readonly static IDictionary<string, QuickRecipe> _knownRecipes = new Dictionary<string, QuickRecipe>(); 

        private readonly IParserFactory _parserFactory;

        public LocalRepository(IParserFactory parserFactory)
        {
            this._parserFactory = parserFactory;
        }

        public Task<QuickRecipe> GetAsync(string id)
        {
            var task = Task.Run(() => _knownRecipes[id]);
            task.Wait();

            return task;
        }

        public async Task<bool> UpdateAsync(string url)
        {
            var uri = new Uri(url);
            IHtmlParser parser;

            try
            {
                parser = this._parserFactory.CreateParser(url);
            }
            catch (KeyNotFoundException)
            {
                return false;
            }

            var parsedContent = await parser.ParseHtmlAsync(uri);
            parsedContent.Id = Guid.NewGuid().ToString();
            _knownRecipes[parsedContent.Id] = parsedContent;

            return true;
        }

        public Task<IEnumerable<QuickRecipeSearchResult>> SearchAsync(string query)
        {
            var task = Task.Run(() =>
                _knownRecipes.Values.Select(x => new QuickRecipeSearchResult { Id = x.Id, Title = x.Title, OriginalUrl = x.OriginalUrl }));
            task.Wait();

            return task;
        }
    }
}