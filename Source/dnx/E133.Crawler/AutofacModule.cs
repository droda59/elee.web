using Autofac;

namespace E133.Crawler
{
    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<SiteCrawler>().As<IHtmlCrawler>().InstancePerDependency();
        }
    }
}