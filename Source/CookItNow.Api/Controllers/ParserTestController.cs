using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

using CookItNow.Api.Infrastucture;
using CookItNow.Api.Models;
using CookItNow.Business.Models;
using CookItNow.Parser;

using MongoDB.Bson;

namespace CookItNow.Api.Controllers
{
    [LocalAuthorizationOnly]
    public class ParserTestController : ApiController
    {
        private readonly IParserFactory _parserFactory;
        private readonly IQuickRecipeRepository _repo;

        public ParserTestController(IParserFactory parserFactory, IQuickRecipeRepository repo)
        {
            this._parserFactory = parserFactory;
            this._repo = repo;
        }

        public async Task<QuickRecipe> GetAsync(string id)
        {
            return await this._repo.GetAsync(id);
        }

        [HttpGet]
        [Route("api/parsertest/search")]
        public async Task<IEnumerable<QuickRecipeSearchResult>> SearchAsync(string query)
        {
            return await this._repo.SearchAsync(query);
        }

        public async Task<IHttpActionResult> Put(string url)
        {
            var result = await this.ParseRecipeAsync(url);
            if (result == null)
            {
                return this.BadRequest();
            }

            await this._repo.UpdateAsync(result);

            return this.Ok(result);
        }

        private async Task<QuickRecipe> ParseRecipeAsync(string url)
        {
            var uri = new Uri(url);
            IHtmlParser parser;

            try
            {
                parser = this._parserFactory.CreateParser(url);
            }
            catch (KeyNotFoundException)
            {
                return null;
            }

            var parsedContent = await parser.ParseHtmlAsync(uri);
            parsedContent.Id = ObjectId.GenerateNewId().ToString();

            return parsedContent;
        }
    }
}