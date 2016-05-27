using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using E133.Api;
using E133.Business;
using E133.Business.Models;
using E133.Parser;

using HtmlAgilityPack;

using MongoDB.Bson;

// using Akka;

namespace E133.Crawler
{
    internal class SiteCrawler// : IHtmlCrawler
    {
        private readonly IHtmlLoader _htmlLoader;
        
        private readonly IQuickRecipeRepository _repo;
        
        private readonly IParserFactory _parserFactory;
        
        private readonly HashSet<Uri> _discoveredLinks;
        
        private readonly HashSet<Uri> _processedLinks;
        
        private readonly HashSet<Uri> _recipeLinks;
        
        public SiteCrawler(IHtmlLoader htmlLoader, IParserFactory parserFactory, IQuickRecipeRepository repo)
        {
            this._htmlLoader = htmlLoader;
            this._parserFactory = parserFactory;
            this._repo = repo;
            
            this._discoveredLinks = new HashSet<Uri>();
            this._processedLinks = new HashSet<Uri>();
            this._recipeLinks = new HashSet<Uri>();
            
            this._discoveredLinks.Add(new Uri("http://www.ricardocuisine.com/"));
        }

        // Faire un IDictionary<Uri, bool> _links
        // Démarre un acteur-lecteur sur le dictionaire
        // Ajoute le base url dans le dictionaire (acteur démarre ainsi)
        
        // ACTEUR LECTEUR
        // Lire tous les liens de la page
        //// Ajouter chaque lien lu dans le dictionaire
        // Acteur passe à travers le dictionaire
        //// Acteur visite les pages et fait la même chose
        
        // ACTEUR PARSER
        // Vérifie si le lien est une recette
        // Vérifie l'existence de la recette dans la BD
        // Si possible, vérifie la date de dernière modification
        // Parse la recette
        // Ajoute la recette dans la BD
        
        public async Task GetAllLinks()
        {
            // while (true)
            // {
                while (this._discoveredLinks.Any())
                {
                    var link = this._discoveredLinks.First();
                    
                    var newPageLinks = await this.GetPageLinks(link);
                    foreach (var newPageLink in newPageLinks)
                    {
                        this._discoveredLinks.Add(newPageLink);
                        if (this._parserFactory.CreateParser(newPageLink).IsRecipePage(newPageLink))
                        {
                            this._recipeLinks.Add(newPageLink);
                        }
                    }
                    
                    this._processedLinks.Add(link);
                    this._discoveredLinks.Remove(link);
                }
                
            //     await Task.Delay(1000);
            // }
        }
        
        public async Task AddRecipes()
        {
            while (true)
            {
                while (this._recipeLinks.Any())
                {
                    var link = this._recipeLinks.First();
                            
                    var recipe = await this.ParseRecipeAsync(link);
                    if (recipe != null)
                    {
                        var success = await this._repo.InsertAsync(recipe);
                        if (success)
                        {
                            this._recipeLinks.Remove(link);
                        }
                    }
                }
                
                await Task.Delay(1000);
            }
        }

        private async Task<QuickRecipe> ParseRecipeAsync(Uri uri)
        {
            IHtmlParser parser = null;

            try
            {
                parser = this._parserFactory.CreateParser(uri);
            }
            catch (KeyNotFoundException)
            {
                return null;
            }

            var parsedContent = await parser.ParseHtmlAsync(uri);

            return parsedContent;
        }
        
        private async Task<IEnumerable<Uri>> GetPageLinks(Uri pageUri)
        {
            var newLinks = new List<Uri>();
            var content = await this._htmlLoader.ReadHtmlAsync(pageUri);
            
            var document = new HtmlDocument();
            document.LoadHtml(System.Net.WebUtility.HtmlDecode(content));
            
            var linkNodes = document.DocumentNode
                .SelectNodes(".//a[@href]")
                .Select(x => x.Attributes["href"].Value)
                .ToList();
                
            foreach (var linkNode in linkNodes)
            {
                var newLinkUri = new Uri(linkNode);
                
                if (!this._processedLinks.Contains(newLinkUri)
                    && !this._discoveredLinks.Contains(newLinkUri))
                {
                    newLinks.Add(newLinkUri);
                }
            }
            
            return newLinks;
        }
    }
}