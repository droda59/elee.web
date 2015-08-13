using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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

        public async Task<IEnumerable<QuickRecipeSearchResult>> Get(string query)
        {
            return await this._repo.SearchAsync(query);
        }
    }
}