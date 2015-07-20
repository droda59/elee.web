using System;
using System.Collections.Generic;

namespace CookItNow.Business.Models
{
    public class Ingredient 
    {
        public Ingredient()
        {
            this.Requirements = new List<string>();
        }

        public long Id { get; set; }
		
        public int? SubRecipeId { get; set; }
		
        public string Name { get; set; }
		
        public Quantity Quantity { get; set; }
		
        public Ingredient Replacement { get; set; }
		
        public IList<string> Requirements { get; set; }
    }
}