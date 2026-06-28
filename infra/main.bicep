param appName string = 'caloriecraic'
param location string = resourceGroup().location
param sqlAdminLogin string
@secure()
param sqlAdminPassword string

resource staticSite 'Microsoft.Web/staticSites@2023-12-01' = {
  name: appName
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    repositoryUrl: 'https://github.com/valar12/caloriecraic'
    branch: 'main'
    buildProperties: {
      appLocation: '/'
      apiLocation: 'api'
      outputLocation: 'dist'
    }
  }
}

resource sqlServer 'Microsoft.Sql/servers@2023-08-01-preview' = {
  name: '${appName}-sql'
  location: location
  properties: {
    administratorLogin: sqlAdminLogin
    administratorLoginPassword: sqlAdminPassword
    version: '12.0'
    publicNetworkAccess: 'Enabled'
  }
}

resource sqlDb 'Microsoft.Sql/servers/databases@2023-08-01-preview' = {
  parent: sqlServer
  name: '${appName}-db'
  location: location
  sku: {
    name: 'Basic'
    tier: 'Basic'
  }
}

output staticWebAppName string = staticSite.name
output sqlServerName string = sqlServer.name
output sqlDatabaseName string = sqlDb.name
