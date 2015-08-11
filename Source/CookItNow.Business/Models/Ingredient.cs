using System;
using System.Collections.Generic;

namespace CookItNow.Business.Models
{
    public class Ingredient 
    {
        public long Id { get; set; }
		
        public int SubrecipeId { get; set; }
		
        public string Name { get; set; }
		
        public Quantity Quantity { get; set; }
		
        public Ingredient Replacement { get; set; }
		
        public IList<string> Requirements { get; set; }
    }
}