using System;

namespace CookItNow.Business.Models
{
    public class IngredientPart : Part
    {
        public override string Type
        {
            get { return "ingredient"; }
        }

        public Ingredient Ingredient { get; set; }
    }
}