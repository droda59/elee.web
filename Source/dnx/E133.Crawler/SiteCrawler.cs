using System;
using System.Collections.Generic;
using E133.Business;

namespace E133.Crawler
{
    internal class SiteCrawler : IHtmlCrawler
    {
        private readonly IHtmlLoader _htmlLoader;
        
        public SiteCrawler(IHtmlLoader htmlLoader)
        {
            this._htmlLoader = htmlLoader;
        }

        public IEnumerable<Uri> GetLinks()
        {
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
            
            throw new NotImplementedException();
        }
    }
}