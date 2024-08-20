<template>
    <!-- Main jumbotron for a primary marketing message or call to action -->
    <h1 class="text-2xl lg:text-5xl">Markdown Cheat Sheet</h1>
    <p>A quick reference to the Markdown syntax.</p>
    <div class="text-xs lg:text-xl">
        <div>
            <div>
                <h2 id="overview">Overview</h2>

                <p>
                    This Markdown cheat sheet provides a quick overview of all
                    the Markdown syntax elements. It can’t cover every edge
                    case, so if you need more information about any of these
                    elements, refer to the reference guides for
                    <a href="/basic-syntax/">basic syntax</a> and
                    <a href="/extended-syntax/">extended syntax</a>.
                </p>

                <h2 id="basic-syntax">Basic Syntax</h2>

                <p>
                    These are the elements outlined in John Gruber’s original
                    design document. All Markdown applications support these
                    elements.
                </p>

                <table
                    class="table-auto border-black border-2 border-solid w-full mt-8"
                >
                    <thead class="border-black border-2 border-solid">
                        <tr class="border-black border-2 border-solid">
                            <th class="border-black border-2 border-solid">
                                Element
                            </th>
                            <th>Markdown Syntax</th>
                        </tr>
                    </thead>
                    <tbody class="border-black border-2 border-solid">
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/basic-syntax/#headings">Heading</a>
                            </td>
                            <td>
                                <code
                                    ># H1<br />
                                    ## H2<br />
                                    ### H3</code
                                >
                            </td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/basic-syntax/#bold">Bold</a>
                            </td>
                            <td class="border-black border-2 border-solid">
                                <code>**bold text**</code>
                            </td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/basic-syntax/#italic">Italic</a>
                            </td>
                            <td>
                                <code>*italicized text*</code>
                            </td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/basic-syntax/#blockquotes-1"
                                    >Blockquote</a
                                >
                            </td>
                            <td>
                                <code>&gt; blockquote</code>
                            </td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td>
                                <a href="/basic-syntax/#ordered-lists"
                                    >Ordered List</a
                                >
                            </td>
                            <td class="border-black border-2 border-solid">
                                <code>
                                    1. First item<br />
                                    2. Second item<br />
                                    3. Third item<br />
                                </code>
                            </td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/basic-syntax/#unordered-lists"
                                    >Unordered List</a
                                >
                            </td>
                            <td>
                                <code>
                                    - First item<br />
                                    - Second item<br />
                                    - Third item<br />
                                </code>
                            </td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/basic-syntax/#code">Code</a>
                            </td>
                            <td><code>`code`</code></td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/basic-syntax/#horizontal-rules"
                                    >Horizontal Rule</a
                                >
                            </td>
                            <td><code>---</code></td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/basic-syntax/#links">Link</a>
                            </td>
                            <td>
                                <code>[title](https://www.example.com)</code>
                            </td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/basic-syntax/#images-1">Image</a>
                            </td>
                            <td><code>![alt text](image.jpg)</code></td>
                        </tr>
                    </tbody>
                </table>

                <h2 id="extended-syntax">Extended Syntax</h2>

                <p>
                    These elements extend the basic syntax by adding additional
                    features. Not all Markdown applications support these
                    elements.
                </p>

                <table
                    class="table-auto border-black border-2 border-solid w-full my-8"
                >
                    <thead class="border-black border-2 border-solid">
                        <tr>
                            <th class="border-black border-2 border-solid">
                                Element
                            </th>
                            <th>Markdown Syntax</th>
                        </tr>
                    </thead>
                    <tbody class="border-black border-2 border-solid">
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/extended-syntax/#tables">Table</a>
                            </td>
                            <td>
                                <code>
                                    | Syntax | Description |<br />
                                    | ----------- | ----------- |<br />
                                    | Header | Title |<br />
                                    | Paragraph | Text |
                                </code>
                            </td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/extended-syntax/#fenced-code-blocks"
                                    >Fenced Code Block</a
                                >
                            </td>
                            <td>
                                <code
                                    >```<br />
                                    {<br />
                                    &nbsp;&nbsp;"firstName": "John",<br />
                                    &nbsp;&nbsp;"lastName": "Smith",<br />
                                    &nbsp;&nbsp;"age": 25<br />
                                    }<br />
                                    ```
                                </code>
                            </td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/extended-syntax/#footnotes"
                                    >Footnote</a
                                >
                            </td>
                            <td>
                                <code>
                                    Here's a sentence with a footnote. [^1]<br /><br />
                                    [^1]: This is the footnote.
                                </code>
                            </td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/extended-syntax/#heading-ids"
                                    >Heading ID</a
                                >
                            </td>
                            <td>
                                <code>### My Great Heading {#custom-id}</code>
                            </td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/extended-syntax/#definition-lists"
                                    >Definition List</a
                                >
                            </td>
                            <td>
                                <code>
                                    term<br />
                                    : definition
                                </code>
                            </td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/extended-syntax/#strikethrough"
                                    >Strikethrough</a
                                >
                            </td>
                            <td><code>~~The world is flat.~~</code></td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/extended-syntax/#task-lists"
                                    >Task List</a
                                >
                            </td>
                            <td>
                                <code>
                                    - [x] Write the press release<br />
                                    - [ ] Update the website<br />
                                    - [ ] Contact the media
                                </code>
                            </td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/extended-syntax/#emoji">Emoji</a
                                ><br />(see also
                                <a
                                    href="/extended-syntax/#copying-and-pasting-emoji"
                                    >Copying and Pasting Emoji</a
                                >)
                            </td>
                            <td><code> That is so funny! :joy: </code></td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/extended-syntax/#highlight"
                                    >Highlight</a
                                >
                            </td>
                            <td>
                                <code>
                                    I need to highlight these ==very important
                                    words==.
                                </code>
                            </td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/extended-syntax/#subscript"
                                    >Subscript</a
                                >
                            </td>
                            <td><code> H~2~O </code></td>
                        </tr>
                        <tr class="border-black border-2 border-solid">
                            <td class="border-black border-2 border-solid">
                                <a href="/extended-syntax/#superscript"
                                    >Superscript</a
                                >
                            </td>
                            <td><code> X^2^ </code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
