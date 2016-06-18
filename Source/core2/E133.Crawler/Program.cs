using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Autofac;

using E133.Business;
using E133.Parser;

namespace E133.Crawler
{
    public class Program
    {
        public static void Main(string[] args)
        {
            MainAsync().Wait();
        }

        static async Task MainAsync()
        {
			var builder = new ContainerBuilder();
            builder.RegisterModule(new E133.Business.AutofacModule());
            builder.RegisterModule(new E133.Crawler.AutofacModule());
            builder.RegisterModule(new E133.Parser.AutofacModule());
            var container = builder.Build();
            
            var repo = container.Resolve<IQuickRecipeRepository>();
            var crawler = container.Resolve<IHtmlCrawler>();

            var knownParsers = container.Resolve<IEnumerable<IHtmlParser>>();
            foreach (var parser in knownParsers)
            {
                // TODO Start these assholes asynchronously
                var allSiteLinks = await crawler.GetAllSiteLinks(parser.BaseDomain);

                foreach (var link in allSiteLinks) 
                {
                    var isRecipe = parser.IsRecipePage(link);
                    if (isRecipe)
                    {
                        var recipe = await parser.ParseHtmlAsync(link);
                        if (recipe != null)
                        {
                            Console.WriteLine("Parsing of " + link + " was successful. Adding to repo.");

                            var success = await repo.InsertAsync(recipe);
                            if (success)
                            {
                                Console.WriteLine("Recipe " + link + " was successfully added to repo. Removing link.");
                            }
                        }
                        else
                        {
                            Console.WriteLine("Parsing of " + link + " was UNsuccessful.");
                        }
                    }
                }
            }

            Console.ReadLine();
        }
    }
}
