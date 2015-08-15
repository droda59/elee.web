using System;
using System.Collections.Generic;

namespace CookItNow.Business.Models
{
    public class IngredientEnumerationPart : Part
    {
        public IngredientEnumerationPart()
        {
            this.Ingredients = new List<Ingredient>();
        }

        public override string Type
        {
            get { return "enumeration"; }
        }

        public IList<Ingredient> Ingredients { get; set; }
    }
}
