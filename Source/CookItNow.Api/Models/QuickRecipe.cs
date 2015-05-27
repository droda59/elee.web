using System;
using System.Collections.Generic;

namespace CookItNow.Api.Models
{
	public class Duration 
	{
		public string Title { get; set; }
		
		public string Time { get; set; }
	}
	
	public class SubRecipe
	{
		public int Id { get; set; }
		
		public string Title { get; set; }
	}
	
	public class Ingredient 
	{
		public long Id { get; set; }
		
		public int? SubRecipeId { get; set; }
		
		public string Name { get; set; }
		
		public Quantity Quantity { get; set; }
		
		public Ingredient Replacement { get; set; }
		
		public IEnumerable<string> Requirements { get; set; }
	}
	
	public class Quantity 
	{
		public double Value { get; set; }
		
		public MeasureUnit OriginalMeasureUnit { get; set; }
	}
	
	public enum MeasureUnit
	{
		Ounce, 

        Millilitre, 

        Litre, 

        Units, 
		
		Pinch, 
		
		Cup
	}
	
	public class RecipeStep  
	{
	    public string Description { get; set; }
		
		public int? SubRecipeId { get; set; }

	    public RecipeStep PostStep { get; set; }
	}
	
	public class QuickRecipe
	{
		public long Id { get; set; }
		
		public string Title { get; set; }
		
		public string OriginalUrl { get; set; }
		
		public string Summary { get; set; }
		
		public int OriginalServings { get; set; }
		
		public IEnumerable<Duration> Durations { get; set; }
		
		public IEnumerable<SubRecipe> SubRecipes { get; set; }
		
		public IEnumerable<Ingredient> Ingredients { get; set; }
		
		public IEnumerable<RecipeStep> Steps { get; set; }
	}
}