import { parseAbi } from 'viem';

export const myContactAbi = parseAbi([
  'event NAME_CHANGED(address indexed changedBy, string oldName, string newName)',
  'event USER_DETAILS_CHANGED(address indexed changedBy, string oldName, string oldMobile, string newName, string newMobile)',
  'function setName(string _name)',
  'function setUserDetails(string _name, string _mobile)',
  'function getName() view returns (string)',
  'function getMobile() view returns (string)',
  'function getUserDetails() view returns (string, string)',
]);
