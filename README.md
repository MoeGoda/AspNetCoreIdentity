# ASP.NET Core Identity Series

## The most complete guide for ASP.NET Core Identity 

## Part 1 

* Introduction to ASP.NET Core Identity library
* Describe ASP.NET Core Identity basic archirecture
* Explain the role and relationship between `Stores` and `Managers` and how they function under the hood
* Explain what `Claims`, `ClaimsIdentity` and `ClaimsPrincipal` entities are and how they are related
* Step by step guide on how to install and start using the core packages
* Associated repository branch: [getting-started](https://github.com/chsakell/aspnet-core-identity/tree/getting-started)

## Part 2 

* Introduce `Microsoft.Extensions.Identity.Stores` and `UserStoreBase` store implementations
* Plug and configure Entity Framework Core with ASP.NET Core Identity and minimum configuration
* Explain Entity Framework different store implementations such as `UserOnlyStore` or `UserStore`
* Step by step guide for applying migrations and creating Identity's SQL Schema
* Discuss whether you should use ASP.NET Core Identity with Entity Framework
* Associated repository branch: [entity-framework-integration](https://github.com/chsakell/aspnet-core-identity/tree/entity-framework-integration)

## Part 3 

* Explain `Claims-based` authorization by example
* Explain `Role-based` authorization by example
* Step by step guide for creating custom `Authorization Policy Provider`
* Explain how authorization works under the hood
* Explain `Imperative authorization` by example
* Associated repository branch: [authorization](https://github.com/chsakell/aspnet-core-identity/tree/authorization)

## Part 4 

* Explain how `OAuth 2.0` works *(terminology, grant types, tokens)*
* Explain how `OpenID Connect` works *(terminology, tokens, flows)*
* Learn how to use `IdentityServer` for integrating  `OAuth 2.0` and `OpenID Connect`
* Associated repository branch: [identity-server](https://github.com/chsakell/aspnet-core-identity/tree/identity-server)

## Part 5 

* Step by step guides for enabling external provider authentication
  *  [Google authentication](https://wp.me/p3mRWu-1Kq#google)
  *  [Facebook authentication](https://wp.me/p3mRWu-1Kq#facebook)
  *  [Twitter authentication](https://wp.me/p3mRWu-1Kq#twitter)
  *  [Microsoft authentication](https://wp.me/p3mRWu-1Kq#microsoft)
  *  [GitHub authentication](https://wp.me/p3mRWu-1Kq#github)
  *  [LinkedIn authentication](https://wp.me/p3mRWu-1Kq#linkedin)
  *  [DropBox authentication](https://wp.me/p3mRWu-1Kq#dropbox)
* Implement an external provider [registration strategy](https://wp.me/p3mRWu-1Kq#registration-strategy)

## Part 6

* Implement all Two Factor Authentication related tasks:
  *  Enable/Disable 2FA
  *  Configure authenticator app *(QR Code included)*
  *  Generate/Reset recovery tokens
  *  Reset authenticator app
* Explore the 2FA code and database schema
* Enhance the security level of 2FA by overriding the default implementation
  *  Encrypt authenticator key
  *  Encrypt recovery tokens

> To be continued..

## Installation instructions

The project is built with ASP.NET Core with Angular on the client side. 
1. **Basic project setup**:
    * `cd ./AspNetCoreIdentity` where the package.json file exist
    * `npm install`
    * `dotnet restore`
    * `dotnet build`
    * `dotnet run`
2. **Create the *AspNetCoreIdentityDb* database** *(skip if you want to run with In memory DB)*
    * `cd ./AspNetCoreIdentity` where the AspNetCoreIdentity.csproj exist
    * `Add-Migration initial_migration` or `dotnet ef migrations add initial_migration`
    * `Update-Database` or `dotnet ef database update`
3. **Create the *IdentityServerDb* database** *(skip if you want to run with In memory DB)*

> In case you don't want to use a real SQL Server Database when running the `AspNetCoreIdentity` project, simply set **InMemoryProvider: true** in the *appsettings.json*. This option will use in memory database

> In case you don't want to use a real SQL Server Database when running the `IdentityServer` project simply set **UseInMemoryStores: true** in the relative *appsettings.json* This option will use in memory database
