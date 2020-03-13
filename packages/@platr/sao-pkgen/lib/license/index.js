const licenses = [
  {
    name: 'MIT', value: 'MIT.ejs',
  },
  {
    name: 'Internet Systems Consortium (ISC) License', value: 'ISC.ejs',
  },
  {
    name: 'Apache 2.0', value: 'Apache-2.0.ejs',
  },
  {
    name: 'Mozilla Public License 2.0', value: 'MPL-2.0.ejs',
  },
  {
    name: 'BSD 2-Clause (FreeBSD) License', value: 'BSD-2-Clause-FreeBSD.ejs',
  },
  {
    name: 'BSD 3-Clause (NewBSD) License', value: 'BSD-3-Clause.ejs',
  },
  {
    name: 'GNU AGPL 3.0', value: 'AGPL-3.0.ejs',
  },
  {
    name: 'GNU GPL 3.0', value: 'GPL-3.0.ejs',
  },
  {
    name: 'GNU LGPL 3.0', value: 'LGPL-3.0.ejs',
  },
  {
    name: 'Unlicense', value: 'unlicense.ejs',
  },
  {
    name: 'No License (Copyrighted)', value: 'UNLICENSED.ejs',
  },
]

const licenseKeys = licenses.map(license => license.name)

module.exports = {
  licenses,
  licenseKeys,
}
