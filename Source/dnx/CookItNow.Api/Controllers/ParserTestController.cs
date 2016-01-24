using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using CookItNow.Api.Models;
using CookItNow.Business.Models;
using CookItNow.Parser;

using Microsoft.AspNet.Mvc;

using MongoDB.Bson;

namespace CookItNow.Api.Controllers
{
    // [Authorize(Policy = "LocalAuthorizationOnly")]
    [Route("api/[controller]")]
    public class ParserTestController : Controller
    {
        private readonly IParserFactory _parserFactory;
        private readonly IQuickRecipeRepository _repo;

        public ParserTestController(IParserFactory parserFactory, IQuickRecipeRepository repo)
        {
            this._parserFactory = parserFactory;
            this._repo = repo;
        }

        [HttpGet("{id}")]
        public async Task<QuickRecipe> GetAsync(string id)
        {
            return await this._repo.GetAsync(id);
        }

        [HttpGet]
        [Route("search")]
        public async Task<IEnumerable<QuickRecipeSearchResult>> SearchAsync(string query)
        {
            return await this._repo.SearchAsync(query);
        }

        [HttpGet]
        [Route("parse")]
        public async Task<IActionResult> ParseAsync(string url)
        {
            var result = await this.ParseRecipeAsync(url);
            if (result == null)
            {
                return new BadRequestResult();
            }

            return new ObjectResult(result);
        }

        [HttpPut]
        public async Task<IActionResult> PutAsync(string url)
        {
            var recipe = await this.ParseRecipeAsync(url);
            if (recipe == null)
            {
                return new BadRequestResult();
            }

            var success = await this._repo.UpdateAsync(recipe);
            if (!success)
            {
                return new BadRequestResult();
            }

            return new ObjectResult(recipe);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(string url)
        {
            var recipe = await this.ParseRecipeAsync(url);
            if (recipe == null)
            {
                return new BadRequestResult();
            }

            var success = await this._repo.InsertAsync(recipe);
            if (!success)
            {
                return new BadRequestResult();
            }

            return new ObjectResult(recipe);
        }

        private async Task<QuickRecipe> ParseRecipeAsync(string url)
        {
            var uri = new Uri(url);
            IHtmlParser parser = null;

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