using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

using CookItNow.Api.Infrastucture;

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

        public async Task<IHttpActionResult> Put(string url)
        {
            var result = await this._repo.Update(url);

            if (result)
            {
                var recipeId = this._repo.Search("").Single(x => x.OriginalUrl == url).Id;
                var recipe = this._repo.Get(recipeId);

                return this.Ok(recipe);
            }

            return this.BadRequest();
        }
    }
}