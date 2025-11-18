import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { toolRegistry, getToolById } from '@/lib/constants/toolRegistry'
import Container from '@/components/ui/Container'
import JsonFormatter from '@/components/tools/JsonFormatter'
import Base64EncoderDecoder from '@/components/tools/Base64EncoderDecoder'
import UrlEncoderDecoder from '@/components/tools/UrlEncoderDecoder'
import UuidGenerator from '@/components/tools/UuidGenerator'
import LoremIpsumGenerator from '@/components/tools/LoremIpsumGenerator'
import HashGenerator from '@/components/tools/HashGenerator'
import TextCaseConverter from '@/components/tools/TextCaseConverter'
import TextDiffChecker from '@/components/tools/TextDiffChecker'
import HtmlFormatter from '@/components/tools/HtmlFormatter'
import CssFormatter from '@/components/tools/CssFormatter'
import MarkdownEditor from '@/components/tools/MarkdownEditor'
import ColorPicker from '@/components/tools/ColorPicker'
import TimestampConverter from '@/components/tools/TimestampConverter'
import RegexTester from '@/components/tools/RegexTester'
import JWTDecoder from '@/components/tools/JWTDecoder'
import JavaScriptFormatter from '@/components/tools/JavaScriptFormatter'
import SQLFormatter from '@/components/tools/SQLFormatter'
import QRCodeGenerator from '@/components/tools/QRCodeGenerator'
import ImageToBase64 from '@/components/tools/ImageToBase64'
import CronParser from '@/components/tools/CronParser'
import XMLFormatter from '@/components/tools/XMLFormatter'
import JWTGenerator from '@/components/tools/JWTGenerator'
import CSVToJSONConverter from '@/components/tools/CSVToJSONConverter'
import PasswordGenerator from '@/components/tools/PasswordGenerator'
import JSONToYAMLConverter from '@/components/tools/JSONToYAMLConverter'
import HTMLEntityConverter from '@/components/tools/HTMLEntityConverter'
import NumberBaseConverter from '@/components/tools/NumberBaseConverter'
import TextEscaper from '@/components/tools/TextEscaper'
import JSONPathTester from '@/components/tools/JSONPathTester'
import StringCounter from '@/components/tools/StringCounter'
import TextSorter from '@/components/tools/TextSorter'
import DuplicateLineRemover from '@/components/tools/DuplicateLineRemover'
import RandomStringGenerator from '@/components/tools/RandomStringGenerator'
import UnicodeCharacterFinder from '@/components/tools/UnicodeCharacterFinder'
import BackslashEscaper from '@/components/tools/BackslashEscaper'
import SlugGenerator from '@/components/tools/SlugGenerator'
import TextReverser from '@/components/tools/TextReverser'
import WhitespaceRemover from '@/components/tools/WhitespaceRemover'
import BinaryTextConverter from '@/components/tools/BinaryTextConverter'
import MorseCodeConverter from '@/components/tools/MorseCodeConverter'
import MarkdownToHTMLConverter from '@/components/tools/MarkdownToHTMLConverter'
import JSONToXMLConverter from '@/components/tools/JSONToXMLConverter'
import URLParser from '@/components/tools/URLParser'
import YAMLFormatter from '@/components/tools/YAMLFormatter'
import HexColorConverter from '@/components/tools/HexColorConverter'
import JSONDiffViewer from '@/components/tools/JSONDiffViewer'
import TemplateFormatter from '@/components/tools/TemplateFormatter'
import FileSizeConverter from '@/components/tools/FileSizeConverter'
import UnixPermissionsCalculator from '@/components/tools/UnixPermissionsCalculator'
import EmailURLValidator from '@/components/tools/EmailURLValidator'
import UserAgentParser from '@/components/tools/UserAgentParser'
import GitIgnoreGenerator from '@/components/tools/GitIgnoreGenerator'
import CSSMinifier from '@/components/tools/CSSMinifier'
import JavaScriptMinifier from '@/components/tools/JavaScriptMinifier'
import TextStatistics from '@/components/tools/TextStatistics'
import ROT13Cipher from '@/components/tools/ROT13Cipher'
import RomanNumeralConverter from '@/components/tools/RomanNumeralConverter'
import CSSUnitConverter from '@/components/tools/CSSUnitConverter'
import IPAddressTools from '@/components/tools/IPAddressTools'
import ColorNameLookup from '@/components/tools/ColorNameLookup'
import HTTPStatusCodeLookup from '@/components/tools/HTTPStatusCodeLookup'
import MIMETypeLookup from '@/components/tools/MIMETypeLookup'
import ASCIITableReference from '@/components/tools/ASCIITableReference'
import CSSGradientGenerator from '@/components/tools/CSSGradientGenerator'
import CSSBoxShadowGenerator from '@/components/tools/CSSBoxShadowGenerator'
import MarkdownTableGenerator from '@/components/tools/MarkdownTableGenerator'
import LoremIpsumVariants from '@/components/tools/LoremIpsumVariants'
import TextToASCIIArt from '@/components/tools/TextToASCIIArt'
import TimezoneConverter from '@/components/tools/TimezoneConverter'
import CreditCardValidator from '@/components/tools/CreditCardValidator'

// Tool component mapper
const toolComponents: Record<string, React.ComponentType> = {
  'json-formatter': JsonFormatter,
  'base64-encoder': Base64EncoderDecoder,
  'url-encoder': UrlEncoderDecoder,
  'uuid-generator': UuidGenerator,
  'lorem-ipsum': LoremIpsumGenerator,
  'hash-generator': HashGenerator,
  'text-case-converter': TextCaseConverter,
  'text-diff-checker': TextDiffChecker,
  'html-formatter': HtmlFormatter,
  'css-formatter': CssFormatter,
  'markdown-editor': MarkdownEditor,
  'color-picker': ColorPicker,
  'timestamp-converter': TimestampConverter,
  'regex-tester': RegexTester,
  'jwt-decoder': JWTDecoder,
  'javascript-formatter': JavaScriptFormatter,
  'sql-formatter': SQLFormatter,
  'qr-code-generator': QRCodeGenerator,
  'image-to-base64': ImageToBase64,
  'cron-parser': CronParser,
  'xml-formatter': XMLFormatter,
  'jwt-generator': JWTGenerator,
  'csv-json-converter': CSVToJSONConverter,
  'password-generator': PasswordGenerator,
  'json-yaml-converter': JSONToYAMLConverter,
  'html-entity-converter': HTMLEntityConverter,
  'number-base-converter': NumberBaseConverter,
  'text-escaper': TextEscaper,
  'jsonpath-tester': JSONPathTester,
  'string-counter': StringCounter,
  'text-sorter': TextSorter,
  'duplicate-line-remover': DuplicateLineRemover,
  'random-string-generator': RandomStringGenerator,
  'unicode-character-finder': UnicodeCharacterFinder,
  'backslash-escaper': BackslashEscaper,
  'slug-generator': SlugGenerator,
  'text-reverser': TextReverser,
  'whitespace-remover': WhitespaceRemover,
  'binary-text-converter': BinaryTextConverter,
  'morse-code-converter': MorseCodeConverter,
  'markdown-to-html': MarkdownToHTMLConverter,
  'json-xml-converter': JSONToXMLConverter,
  'url-parser': URLParser,
  'yaml-formatter': YAMLFormatter,
  'hex-color-converter': HexColorConverter,
  'json-diff-viewer': JSONDiffViewer,
  'template-formatter': TemplateFormatter,
  'file-size-converter': FileSizeConverter,
  'unix-permissions': UnixPermissionsCalculator,
  'email-url-validator': EmailURLValidator,
  'user-agent-parser': UserAgentParser,
  'gitignore-generator': GitIgnoreGenerator,
  'css-minifier': CSSMinifier,
  'javascript-minifier': JavaScriptMinifier,
  'text-statistics': TextStatistics,
  'rot13-cipher': ROT13Cipher,
  'roman-numeral-converter': RomanNumeralConverter,
  'css-unit-converter': CSSUnitConverter,
  'ip-address-tools': IPAddressTools,
  'color-name-lookup': ColorNameLookup,
  'http-status-code-lookup': HTTPStatusCodeLookup,
  'mime-type-lookup': MIMETypeLookup,
  'ascii-table-reference': ASCIITableReference,
  'css-gradient-generator': CSSGradientGenerator,
  'css-box-shadow-generator': CSSBoxShadowGenerator,
  'markdown-table-generator': MarkdownTableGenerator,
  'lorem-ipsum-variants': LoremIpsumVariants,
  'text-to-ascii-art': TextToASCIIArt,
  'timezone-converter': TimezoneConverter,
  'credit-card-validator': CreditCardValidator,
}

// Generate static params for all tools
export async function generateStaticParams() {
  return toolRegistry.map((tool) => ({
    slug: tool.id,
  }))
}

// Generate metadata for each tool page
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const tool = getToolById(params.slug)

  if (!tool) {
    return {
      title: 'Tool Not Found - CodeBox',
      description: 'The requested tool could not be found.',
    }
  }

  return {
    title: `${tool.name} - CodeBox`,
    description: tool.description,
    keywords: [tool.name, ...tool.keywords, 'developer tool', 'free online tool'],
  }
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolById(params.slug)

  if (!tool) {
    notFound()
  }

  // Get the tool component
  const ToolComponent = toolComponents[params.slug]

  return (
    <div className="py-8 md:py-12 bg-bg-primary">
      <Container>
        {/* Tool Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl" aria-hidden="true">
              {tool.icon}
            </span>
            <div>
              <h1 className="font-mono text-3xl md:text-4xl font-bold text-text-primary mb-2">
                {tool.name}
              </h1>
              <p className="text-lg text-text-secondary">{tool.description}</p>
            </div>
          </div>

          {/* Features */}
          {tool.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tool.features.map((feature, index) => (
                <span
                  key={index}
                  className="text-xs font-mono text-accent-primary bg-bg-secondary border border-border-primary px-3 py-1"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Tool Component */}
        {ToolComponent ? (
          <ToolComponent />
        ) : (
          <div className="text-center py-16 bg-bg-secondary border border-border-primary">
            <p className="font-mono text-xl text-text-secondary mb-4">
              🚧 Tool Implementation Coming Soon
            </p>
            <p className="text-text-tertiary">
              The <span className="text-accent-primary">{tool.name}</span> tool is
              being built right now!
            </p>
          </div>
        )}

        {/* Tool Info */}
        <div className="mt-8 bg-bg-secondary border border-border-primary p-6">
          <h2 className="font-mono text-xl font-semibold text-text-primary mb-4">
            About This Tool
          </h2>
          <div className="space-y-4 text-text-secondary">
            <div>
              <h3 className="font-mono text-sm text-accent-primary mb-2">
                CATEGORY
              </h3>
              <p className="font-mono">{tool.category}</p>
            </div>
            <div>
              <h3 className="font-mono text-sm text-accent-primary mb-2">
                FEATURES
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {tool.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-border-primary">
              <p className="text-sm text-text-tertiary">
                ✓ All processing happens in your browser
              </p>
              <p className="text-sm text-text-tertiary">
                ✓ No data is sent to any server
              </p>
              <p className="text-sm text-text-tertiary">
                ✓ 100% free and open source
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
