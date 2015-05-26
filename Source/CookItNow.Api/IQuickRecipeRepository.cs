using System;
using System.Collections.Generic;

using CookItNow.Api.Models;

namespace CookItNow.Api
{
    public interface IQuickRecipeRepository
    {
        IEnumerable<QuickRecipe> All { get; }

        QuickRecipe FindQuickRecipe(long id);
    }
}