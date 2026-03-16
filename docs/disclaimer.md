---
title: "Disclaimer — AI-Generated Code and Token Usage"
description: "Important information about AI token consumption, generated code quality, third-party integrations, and warranty limitations when using Tessera."
---

# Disclaimer

## AI Token Usage

Tessera calls AI CLI tools installed on your system (Claude, Gemini, Codex) to generate code. **Each call consumes tokens from your own subscription plan or API quota.**

- Tessera does not provide, manage, or pay for AI access
- You are responsible for understanding your plan's limits, costs, and terms of service
- A typical project build uses 5-10 AI calls depending on project complexity
- The [plan-aware routing](/docs/ai-routing#plan-aware-routing) during setup helps Tessera route tasks efficiently based on your subscriptions

## Generated Code

All code produced by Tessera is **AI-generated**. While Tessera includes multiple safeguards:

- [AI peer review](/docs/ai-routing#ai-peer-review) (different tool reviews the output)
- PHP lint on all generated files
- Automated test generation and execution
- Filament namespace auto-fix
- Route verification

**AI-generated code may still contain:**

- Bugs and logic errors
- Security vulnerabilities
- Incorrect business logic
- Incompatible dependencies
- Missing edge case handling

**You are responsible** for reviewing, testing, and validating all generated code before use in any environment — especially production.

## Third-Party Services

Tessera may generate code that integrates with third-party services including but not limited to:

- Payment providers (Stripe, CorvusPay, PayPal, etc.)
- Cloud services (AWS, Firebase, Supabase)
- Email services (Mailchimp, Brevo)
- Search engines (Meilisearch, Algolia)

These integrations are scaffolded based on AI interpretation and may require manual configuration, testing, and validation. **Tessera is not affiliated with and makes no guarantees about any third-party service.**

## No Warranty

THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR ANY CODE IT GENERATES.

**Use at your own risk.**
