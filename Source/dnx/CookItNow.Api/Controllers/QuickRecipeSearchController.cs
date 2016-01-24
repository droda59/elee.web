using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNet.Mvc;

using CookItNow.Api.Models;

namespace CookItNow.Api.Controllers
{
    [Route("api/[controller]")]
    public class QuickRecipeSearchController : Controller
    {
        private readonly IQuickRecipeRepository _repo;

        public QuickRecipeSearchController(IQuickRecipeRepository repo)
        {
            this._repo = repo;
        }

        [HttpGet]
        public async Task<IEnumerable<QuickRecipeSearchResult>> Get(string query)
        {
            return await this._repo.SearchAsync(query);
        }
    }
}