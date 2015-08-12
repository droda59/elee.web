using System;
using System.Collections.Generic;
using System.Web.Http;

using CookItNow.Api.Models;

namespace CookItNow.Api.Controllers
{
    public class QuickRecipeSearchController : ApiController
    {
        private readonly IQuickRecipeRepository _repo;

        public QuickRecipeSearchController(IQuickRecipeRepository repo)
        {
            this._repo = repo;
        }

        public IEnumerable<QuickRecipeSearchResult> Get(string query)
        {
            return this._repo.Search(query);
        }
    }
}