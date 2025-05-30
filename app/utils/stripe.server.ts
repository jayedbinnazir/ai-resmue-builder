import Stripe from 'stripe'
import { prisma } from './db.server.ts'

export default class StripeHelper {
	private stripe: Stripe

	constructor() {
		if (process.env.STRIPE_SK) {
			this.stripe = new Stripe(process.env.STRIPE_SK, {
				apiVersion: '2023-10-16',
			})
		} else {
			throw new Error('env variable STRIPE_SK is undefined')
		}
	}

	async createCustomer({
		userId,
		email,
		name,
	}: {
		userId: string
		email: string
		name: string
	}) {
		const existingCustomer = await prisma.user.findUnique({
			where: { id: userId },
			select: { stripeCustomerId: true, id: true },
		})
		if (existingCustomer?.stripeCustomerId) {
			return existingCustomer.stripeCustomerId
		}
		const customer = await this.stripe.customers.create({ email, name })
		await prisma.user.update({
			where: { id: userId },
			data: {
				stripeCustomerId: customer.id,
			},
		})
		return customer.id
	}

	async createCheckoutSessionLink({
		priceId,
		successUrl,
		cancelUrl,
		subscriptionId,
		customer,
	}: {
		priceId: string
		successUrl: string
		cancelUrl: string
		subscriptionId: string
		customer: string
	}): Promise<Stripe.Checkout.Session> {
		const checkoutSession = await this.stripe.checkout.sessions.create({
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			customer: customer,
			success_url: successUrl,
			cancel_url: cancelUrl,
			mode: 'subscription',
			subscription_data: {
				trial_period_days: 3,
			},
			metadata: {
				subscriptionId,
			},
		})
		return checkoutSession as Stripe.Checkout.Session & {
			subscription: Stripe.Subscription
		}
	}

	async createBillingPortalSession({
		customerId,
		returnUrl,
	}: {
		customerId: string
		returnUrl: string
	}) {
		const session = await this.stripe.billingPortal.sessions.create({
			customer: customerId,
			return_url: returnUrl,
		})
		return session.url
	}

	async cancelSubscription({ subscriptionId }: { subscriptionId: string }) {
		const session = await this.stripe.subscriptions.cancel(subscriptionId)
		return session
	}
}
