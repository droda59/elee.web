namespace CookItNow.Api
{
	public class Duration 
	{
		public string Title { get; set; }
		
		public string Time { get; set; }
	}
	
	public class Ingredient 
	{
		public long Id { get; set; }
		
		public string Name { get; set; }
		
		public Quantity Quantity { get; set; }
		
		public Ingredient Replacement { get; set; }
	}
	
	public class Quantity 
	{
		public int Value { get; set; }
		
		public MeasureUnit OriginalMeasureUnit { get; set; }
	}
	
	public enum MeasureUnit
	{
		
	}
	
	public class RecipeStep  
	{
		
	}
	
	public class QuickRecipe
	{
		public long Id { get; set; }
		
		public string Title { get; set; }
		
		public string OriginalUrl { get; set; }
		
		public string Summary { get; set; }
		
		public int OriginalServings { get; set; }
		
		public IEnumerable<Duration> Durations { get; set; }
		
		public IEnumerable<Ingredient> Ingredients { get; set; }
		
		public IEnumerable<RecipeStep> Steps { get; set; }
		
// 		{
//     "Id": 2,
//     "Title": "Gaufres",
//     "OriginalUrl": "http://www.ricardocuisine.com/recettes/3892-gaufres",
//     "Summary": "",
//     "OriginalServings": 8,
//     "Durations": [
//         {
//             "Title": "Préparation",
//             "Time": "PT0H10M"
//         }
//     ],
//     "Ingredients": [
//         {
//             "Id": 1,
//             "Name": "Lait de beurre",
//             "Quantity": {
//                 "Value": 250,
//                 "OriginalMeasureUnit": "ml"
//             },
// 			"Replacements": [
//                 {
// 					"Name": "Lait",
// 					"Quantity": {
//                         "Value": 250,
//                         "OriginalMeasureUnit": "ml"
// 				      }
//                 }
//             ]
//         }
//     ],
//     "Steps": [
//         {
//             "Description": "Dans un bol, {action:'Mélanger'} {ingredientId:2}, {ingredientId:3}, {ingredientId:6}, {ingredientId:7} et {ingredientId:8}. {action:'Réserver'}."
//         },
//         {
//             "Description": "Dans un autre bol, {action:'Fouetter'} {ingredientId:9} et {ingredientId:5} environ {timer:'PT0H05M'} jusqu'à ce qu'ils blanchissent, forment un ruban et triplent de volume.",
//             "PostStep": 
//             {
//                 "Description": "{action:'Ajouter'} {ingredientId:4} graduellement en fouettant. À l'aide dune spatule, {action:'Incorporer'} les ingrédients secs en alternant avec {ingredientId:1} jusqu'à ce que le mélange soit humecté (il restera quelques grumeaux de farine). {action:'Laisser reposer'} {timer:'PT0H10M'}."
//             }
//         },
//         {
//             "Description": "{action:'Préchauffer'} le gaufrier. {action:'Verser'} environ 250 ml (1 tasse) de pâte à la fois (pour deux gaufres) et {action:'Refermer'} l'appareil (ou selon les recommandations du fabricant). {action:'Cuire'} environ {timer:'PT0H05M'} ou jusqu'à ce qu'elles soient dorées.",
//             "PostStep":
//             {
//                 "Description": "{action:'Réserver'} au chaud. {action:'Répéter'} l'opération avec le reste de la pâte. {action:'Servir'} avec le coulis de fraises en trempette."
//             } 
//         }
//     ]
// }
	}
}