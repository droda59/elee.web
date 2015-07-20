using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

using CookItNow.Business.Models;
using CookItNow.Parser;

namespace CookItNow.Api.Controllers
{
    public class ParserTestController : ApiController
    {
        private readonly IParserFactory _parserFactory;

        public ParserTestController(IParserFactory parserFactory)
        {
            this._parserFactory = parserFactory;
        }

        public async Task<IHttpActionResult> Get(string url)
        {
            var uri = new Uri(url);
            IHtmlParser parser;

            try
            {
                parser = this._parserFactory.CreateParser(url);
            }
            catch (KeyNotFoundException)
            {
                return this.StatusCode(HttpStatusCode.NotImplemented);
            }

            var parsedContent = await parser.ParseHtmlAsync(uri);

            return this.Ok(parsedContent);
        }
    }
}