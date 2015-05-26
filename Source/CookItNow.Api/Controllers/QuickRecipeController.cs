using System;
using System.Collections.Generic;
using System.Web.Http;

using CookItNow.Api.Models;

namespace CookItNow.Api.Controllers
{
    [Authorize]
    public class QuickRecipeController : ApiController
    {
        private readonly IQuickRecipeRepository _repo;

        public QuickRecipeController()
        {
            this._repo = new QuickRecipeRepository();
        }

        // GET api/values
        public IEnumerable<QuickRecipe> Get()
        {
            return this._repo.All;
        }

        // GET api/values/5
        public QuickRecipe Get(long id)
        {
            return this._repo.FindQuickRecipe(id);
        }
    }
}
