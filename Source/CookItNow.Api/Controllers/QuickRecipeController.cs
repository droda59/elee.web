using System;
using System.Threading.Tasks;
using System.Web.Http;

using CookItNow.Business.Models;

namespace CookItNow.Api.Controllers
{
    public class QuickRecipeController : ApiController
    {
        private readonly IQuickRecipeRepository _repo;

        public QuickRecipeController(IQuickRecipeRepository repo)
        {
            this._repo = repo;
        }

        public async Task<QuickRecipe> Get(string id)
        {
            return await this._repo.GetAsync(id);
        }
    }
}
