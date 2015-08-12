using System;
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

        public QuickRecipe Get(long id)
        {
            return this._repo.Get(id);
        }
    }
}
