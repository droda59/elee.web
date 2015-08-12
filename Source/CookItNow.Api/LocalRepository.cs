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
        private readonly static IDictionary<long, QuickRecipe> _knownRecipes = new Dictionary<long, QuickRecipe>(); 

        private readonly IParserFactory _parserFactory;

        public LocalRepository(IParserFactory parserFactory)
        {
            this._parserFactory = parserFactory;
        }

        public QuickRecipe Get(long id)
        {
            return _knownRecipes[id];
        }

        public async Task<bool> Update(string url)
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
            _knownRecipes.Add(parsedContent.Id, parsedContent);

            return true;
        }

        public IEnumerable<QuickRecipeSearchResult> Search(string query)
        {
            var results = 
                _knownRecipes.Values
                    .Select(x => new QuickRecipeSearchResult { Id = x.Id, Title = x.Title, OriginalUrl = x.OriginalUrl })
                    .ToList();

            return results;
        }
    }
}