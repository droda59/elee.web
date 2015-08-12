using System;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace CookItNow.Api.Infrastucture
{
    public class LocalAuthorizationOnlyAttribute : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            return actionContext.Request.RequestUri.Host == "localhost";
        }
    }
}