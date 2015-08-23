using System;
using System.Collections.Generic;

namespace CookItNow.Business.Models
{
    public class QuickRecipe
	{
        public QuickRecipe()
        {
            this.Durations = new List<Duration>();
            this.Subrecipes = new List<Subrecipe>();
            this.Ingredients = new List<Ingredient>();
            this.Steps = new List<Step>();
        }

		public string Id { get; set; }
		
		public string Title { get; set; }

        public string OriginalUrl { get; set; }
		
		public string Summary { get; set; }
		
		public string OriginalServings { get; set; }
		
		public IList<Duration> Durations { get; set; }

        public IList<Subrecipe> Subrecipes { get; set; }

        public IList<Ingredient> Ingredients { get; set; }

        public IList<Step> Steps { get; set; }
	}
}