using System;
using System.Collections.Generic;

using CookItNow.Business.Models;

namespace CookItNow.Api
{
    public class QuickRecipeRepository : IQuickRecipeRepository
    {
        private static readonly IDictionary<long, QuickRecipe> _recipes = new Dictionary<long, QuickRecipe>();

        public IEnumerable<QuickRecipe> All
        {
            get
            {
                return _recipes.Values;
            }
        }

        public QuickRecipe FindQuickRecipe(long id)
        {
            return _recipes[id];
        }
    }
}