import { AccessControl } from 'accesscontrol';



let grantList = [

    //for users resource permission
    { role: 'admin', resource: 'Users', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'Users', action: 'read:any', attributes: '*' },
    { role: 'admin', resource: 'Users', action: 'update:any', attributes: '*'},
    { role: 'admin', resource: 'Users', action: 'delete:any', attributes: '*' },

    { role: 'manager', resource: 'Users', action: 'read:any', attributes: '*' },
    { role: 'manager', resource: 'Users', action: 'update:any', attributes: '*'},
  
 //for leads resource permission
 { role: 'admin', resource: 'Leads', action: 'create:any', attributes: '*' },
 { role: 'admin', resource: 'Leads', action: 'read:any', attributes: '*' },
 { role: 'admin', resource: 'Leads', action: 'update:any', attributes: '*'},
 { role: 'admin', resource: 'Leads', action: 'delete:any', attributes: '*' },

 { role: 'manager', resource: 'Leads', action: 'create:any', attributes: '*' },
 { role: 'manager', resource: 'Leads', action: 'read:any', attributes: '*' },
 { role: 'manager', resource: 'Leads', action: 'update:any', attributes: '*'},

 { role: 'Lead Employee', resource: 'Leads', action: 'create:any', attributes: '*' },
 { role: 'Lead Employee', resource: 'Leads', action: 'read:any', attributes: '*' },
 { role: 'Lead Employee', resource: 'Leads', action: 'update:any', attributes: '*'},
 { role: 'Lead Employee', resource: 'Leads', action: 'delete:any', attributes: '*'},
 
 //for service request resources

     { role: 'admin', resource: 'userRequests', action: 'create:any', attributes: '*' },
 { role: 'admin', resource: 'userRequests', action: 'read:any', attributes: '*' },
 { role: 'admin', resource: 'userRequests', action: 'update:any', attributes: '*'},
 { role: 'admin', resource: 'userRequests', action: 'delete:any', attributes: '*' },

 { role: 'manager', resource: 'userRequests', action: 'delete:any', attributes: '*' },
 { role: 'manager', resource: 'userRequests', action: 'read:any', attributes: '*' },
 { role: 'manager', resource: 'userRequests', action: 'update:any', attributes: '*'},

 { role: 'Lead Employee', resource: 'userRequests', action: 'create:any', attributes: '*' },
 { role: 'Lead Employee', resource: 'userRequests', action: 'read:any', attributes: '*' },
 { role: 'Lead Employee', resource: 'userRequests', action: 'update:any', attributes: '*'},
 { role: 'Lead Employee', resource: 'userRequests', action: 'delete:any', attributes: '*'},

 { role: 'Service Employee', resource: 'userRequests', action: 'read:any', attributes: '*' },
 { role: 'Service Employee', resource: 'userRequests', action: 'update:any', attributes: '*'},
 { role: 'Service Employee', resource: 'userRequests', action: 'delete:any', attributes: '*'},
 
 { role: 'user', resource: 'userRequests', action: 'create:any', attributes: '*' },
 { role: 'user', resource: 'userRequests', action: 'read:any', attributes: '*' },
 { role: 'user', resource: 'userRequests', action: 'update:any', attributes: '*'},
 { role: 'user', resource: 'userRequests', action: 'delete:any', attributes: '*'},
 
];

export const ac = new AccessControl(grantList);






