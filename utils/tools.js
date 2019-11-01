const files = require('./files')

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports = {
    createMDFromJSON: (obj) => {
        var jsonData = `# ${obj.title} Code Snippets\n\n`
        obj.snippets.forEach(element => {
            jsonData += `## ${element.title}\n\n\`\`\`\n${element.code}\n\`\`\`\n\n`
        });
        return jsonData
    },

    createLanguage: (language) => {
        return {
            title: language.capitalize(),
            language: language.toLowerCase(),
            created: Date(),
            snippets: []
        }
    },

    createCodeSnippetFileName: (pwd, language) => {
        return `${pwd}/${language.toLowerCase()}-snippets.json`
    },

    createMDFileName: (language) => {
        return `${language.toLowerCase()}-snippets.md`
    },

    createNewID: (array) => {
        var length = array.length
        return (length != 0) ? array[length - 1].id + 1 : 1
    },

    searchCodeSnippet: (languages, keyword) => {
        var result = []
        keyword = keyword.toLowerCase()
        languages.forEach(language => {
            var jsonData = files.readJSONFile(language.location)
            if (language.language.includes(keyword)) {
                result = result.concat(jsonData.snippets)
            } else {
                jsonData.snippets.forEach(snippet => {
                    if (snippet.title.includes(keyword)) {
                        result.push(snippet)
                    }
                })
            }
        })
        return result
    },

    getSearchIndex: (result) => {
        return parseInt(result.split('.')[0]) - 1
    }
}