using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

using CookItNow.Api.Infrastucture;
using CookItNow.Api.Models;
using CookItNow.Business.Models;

namespace CookItNow.Api.Controllers
{
    [LocalAuthorizationOnly]
    public class ParserTestController : ApiController
    {
        private readonly IQuickRecipeRepository _repo;

        public ParserTestController(IQuickRecipeRepository repo)
        {
            this._repo = repo;
        }

        public async Task<IEnumerable<QuickRecipeSearchResult>> GetAsync()
        {
            return await this._repo.SearchAsync("");
        }

        public async Task<QuickRecipe> GetAsync(string id)
        {
            return await this._repo.GetAsync(id);
        }

        public async Task<IHttpActionResult> Put(string url)
        {
            var result = await this._repo.UpdateAsync(url);

            if (result)
            {
                var searchResult = await this._repo.SearchAsync("");
                var recipeId = searchResult.First(x => x.OriginalUrl == url).Id;
                var recipe = await this._repo.GetAsync(recipeId);

                return this.Ok(recipe);
            }

            return this.BadRequest();
        }
    }
}