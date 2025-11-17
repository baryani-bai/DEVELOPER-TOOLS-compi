#!/bin/bash

# CodeBox Production Deployment Script
# Deploys 20 tools to Vercel with automated checks

set -e  # Exit on error

echo "🚀 CodeBox Deployment Script"
echo "=============================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Pre-flight checks
echo -e "${BLUE}Step 1: Pre-flight checks${NC}"
echo "Checking Node version..."
NODE_VERSION=$(node -v)
echo "✓ Node version: $NODE_VERSION"

echo "Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules not found. Installing..."
    npm install
fi
echo "✓ Dependencies OK"

echo "Running TypeScript check..."
if npx tsc --noEmit; then
    echo -e "${GREEN}✓ TypeScript check passed${NC}"
else
    echo -e "${RED}✗ TypeScript errors found${NC}"
    exit 1
fi

echo ""

# Step 2: Git status check
echo -e "${BLUE}Step 2: Git status check${NC}"
if git diff-index --quiet HEAD --; then
    echo "✓ No uncommitted changes"
else
    echo -e "${YELLOW}⚠️  Uncommitted changes detected${NC}"
    echo "Commit changes before deploying? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        git add -A
        echo "Enter commit message:"
        read -r commit_msg
        git commit -m "$commit_msg"
        git push
        echo -e "${GREEN}✓ Changes committed and pushed${NC}"
    fi
fi

echo ""

# Step 3: Deployment method selection
echo -e "${BLUE}Step 3: Choose deployment method${NC}"
echo "1) Vercel (Recommended)"
echo "2) Netlify"
echo "3) Preview deployment only"
echo "4) Cancel"
read -p "Select option (1-4): " deploy_choice

case $deploy_choice in
    1)
        echo ""
        echo -e "${BLUE}Deploying to Vercel...${NC}"

        # Check if Vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi

        echo "Deploy to production? (y/n)"
        read -r prod_choice

        if [[ "$prod_choice" =~ ^[Yy]$ ]]; then
            echo "Deploying to production..."
            vercel --prod
        else
            echo "Creating preview deployment..."
            vercel
        fi

        echo ""
        echo -e "${GREEN}✅ Deployment complete!${NC}"
        echo ""
        echo "Next steps:"
        echo "1. Test the deployment URL"
        echo "2. Run Lighthouse audit"
        echo "3. Test on mobile device"
        echo "4. Monitor for 24 hours"
        ;;

    2)
        echo ""
        echo -e "${BLUE}Deploying to Netlify...${NC}"

        # Check if Netlify CLI is installed
        if ! command -v netlify &> /dev/null; then
            echo "Installing Netlify CLI..."
            npm install -g netlify-cli
        fi

        echo "Logging in to Netlify..."
        netlify login

        echo "Deploy to production? (y/n)"
        read -r prod_choice

        if [[ "$prod_choice" =~ ^[Yy]$ ]]; then
            echo "Deploying to production..."
            netlify deploy --prod --build
        else
            echo "Creating preview deployment..."
            netlify deploy --build
        fi

        echo ""
        echo -e "${GREEN}✅ Deployment complete!${NC}"
        ;;

    3)
        echo ""
        echo -e "${BLUE}Creating preview deployment...${NC}"

        if command -v vercel &> /dev/null; then
            vercel
        else
            echo "Vercel CLI not found. Install with: npm install -g vercel"
            exit 1
        fi
        ;;

    4)
        echo "Deployment cancelled"
        exit 0
        ;;

    *)
        echo "Invalid option"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}=============================="
echo "Deployment Complete! 🎉"
echo -e "==============================${NC}"
echo ""
echo "Tool Inventory: 20/72 tools live (28%)"
echo ""
echo "📊 What to monitor:"
echo "  - Error logs (first 24 hours)"
echo "  - Performance metrics (Lighthouse)"
echo "  - User feedback"
echo ""
echo "📝 See DEPLOY-CHECKLIST.md for full testing guide"
