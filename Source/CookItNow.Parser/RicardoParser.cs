using System;
using System.Linq;
using System.Threading.Tasks;

using CookItNow.Business.Models;

using HtmlAgilityPack;

namespace CookItNow.Parser
{
    internal class RicardoParser : HtmlParser
    {
        public RicardoParser(IHtmlLoader htmlLoader) 
            : base(htmlLoader, "www.ricardocuisine.com")
        {
        }

        public override async Task<QuickRecipe> ParseHtmlAsync(Uri uri)
        {
            var content = await this.LoadHtmlAsync(uri);

            var recipe = new QuickRecipe();
            recipe.OriginalUrl = uri.AbsoluteUri;

            var document = new HtmlDocument();
            document.LoadHtml(content);

            var language = document.DocumentNode.SelectSingleNode("//html").Attributes["lang"].Value;

            var titleNode = document.DocumentNode.SelectSingleNode("//meta[@name='description']");
            recipe.Title = titleNode.Attributes["content"].Value;

            var recipeInfo = document.DocumentNode
                .SelectSingleNode(".//div[@class='itemDetail']")
                .SelectSingleNode(".//div[@class='desc']")
                .SelectSingleNode(".//dl");

            var yieldNode = recipeInfo.SelectSingleNode(".//dd[@itemprop='recipeYield']");
            recipe.OriginalServings = int.Parse(yieldNode.InnerText);

            var nodes = recipeInfo.ChildNodes;
            var node = nodes.First();
            while (node != null)
            {
                if (node.Name == "dt" && node.InnerText != "Portions")
                {
                    var nextSibling = node.NextSibling.NextSibling;
                    var title = node.InnerText;
                    var time = nextSibling.SelectSingleNode(".//meta[@itemprop]").Attributes["content"].Value;

                    recipe.Durations.Add(new Duration { Title = title, Time = time });
                }

                node = node.NextSibling;
            }

            return recipe;
        }
    }
}