using System;
using System.Collections.Generic;
using System.Linq;

using CookItNow.Business.Models;

using HtmlAgilityPack;

namespace CookItNow.Parser
{
    internal class RicardoParser : HtmlDocumentParser
    {
        public RicardoParser(IHtmlLoader htmlLoader) 
            : base(htmlLoader, "www.ricardocuisine.com")
        {
        }

        protected override string GetRecipeIetfLanguage(HtmlDocument document)
        {
            return document.DocumentNode
                .SelectSingleNode("//html").Attributes["lang"].Value.Trim();
        }

        protected override string GetRecipeTitle(HtmlDocument document)
        {
            return document.DocumentNode
                .SelectSingleNode("//meta[@name='description']").Attributes["content"].Value.Trim();
        }

        protected override string GetRecipeYield(HtmlDocument document)
        {
            var yieldNode = document.DocumentNode
                   .SelectSingleNode(".//div[@class='itemDetail']")
                   .SelectSingleNode(".//div[@class='desc']")
                   .SelectSingleNode(".//dl")
                   .SelectSingleNode(".//dd[@itemprop='recipeYield']");

            if (yieldNode != null)
            {
                return yieldNode.InnerText;
            }

            return string.Empty;
        }

        protected override IEnumerable<Duration> GetDurations(HtmlDocument document)
        {
            var nodes = document.DocumentNode
                .SelectSingleNode(".//div[@class='itemDetail']")
                .SelectSingleNode(".//div[@class='desc']")
                .SelectSingleNode(".//dl")
                .ChildNodes;

            var node = nodes.First();
            while (node != null)
            {
                // TODO Temp fix, localize and do better
                if (node.Name == "dt" && node.InnerText != "Portions")
                {
                    var title = node.InnerText.Trim();
                    var infoContent = node.NextSibling.NextSibling.SelectSingleNode(".//meta[@itemprop]");
                    if (infoContent != null)
                    {
                        var time = infoContent.Attributes["content"].Value;
                        yield return new Duration
                        {
                            Title = title, 
                            Time = time
                        };
                    }
                }

                node = node.NextSibling;
            }
        }

        protected override HtmlNode GetIngredientSection(HtmlDocument document)
        {
            return document.DocumentNode
                .SelectSingleNode("//section[@class='ingredients']")
                .SelectSingleNode(".//div[@class='frmInnerWrap']");
        }

        protected override HtmlNodeCollection GetSubrecipeNodes(HtmlDocument document)
        {
            return this.GetIngredientSection(document)
                .SelectNodes(".//h3");
        }

        protected override string GetSubrecipeTitle(HtmlNode subrecipeNode)
        {
            return subrecipeNode.InnerText.Trim();
        }

        protected override HtmlNodeCollection GetSubrecipeIngredientNodesFromParent(HtmlNode parent)
        {
            return this.GetIngredientNodesFromParent(parent.NextSibling.NextSibling);
        }

        protected override HtmlNodeCollection GetIngredientNodesFromParent(HtmlNode parent)
        {
            return parent
                .SelectNodes(".//li//label[@itemprop='ingredients']//span");
        }

        protected override HtmlNodeCollection GetStepSections(HtmlDocument document)
        {
            return document.DocumentNode
                .SelectNodes("//section[@itemprop='recipeInstructions']//h3");
        }

        protected override HtmlNodeCollection GetSubrecipeSteps(HtmlNode stepSubrecipeNode)
        {
            return stepSubrecipeNode.NextSibling.NextSibling
                .SelectNodes(".//li//span");
        }
    }
}