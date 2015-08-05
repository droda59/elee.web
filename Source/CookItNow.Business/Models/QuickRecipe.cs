using System;
using System.Collections.Generic;

namespace CookItNow.Business.Models
{
    public class QuickRecipe
	{
        public QuickRecipe()
        {
            this.Durations = new List<Duration>();
            this.SubRecipes = new List<SubRecipe>();
            this.Ingredients = new List<Ingredient>();
            this.Requirements = new List<Step>();
            this.Steps = new List<Step>();
        }

		public long Id { get; set; }
		
		public string Title { get; set; }
		
		public string OriginalUrl { get; set; }
		
		public string Summary { get; set; }
		
		public int OriginalServings { get; set; }
		
		public IList<Duration> Durations { get; set; }

        public IList<SubRecipe> SubRecipes { get; set; }

        public IList<Ingredient> Ingredients { get; set; }

        public IList<Step> Requirements { get; set; }

        public IList<Step> Steps { get; set; }
	}
}